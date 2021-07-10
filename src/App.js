import React from 'react';
import './App.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button, Collapse, Panel, ControlLabel } from 'react-bootstrap';
import Clipboard from 'clipboard';
import _ from 'underscore';
import ReactInterval from 'react-interval';

var App = React.createClass({
    getDefaultRoute() {
        return 'None';
    },
    getInitialState() {
        return {
            selected: '',
            route: this.getDefaultRoute(),
            handle: null
        }
    },
    componentDidMount() {
        new Clipboard('.copy');
    },
    handleClick(e) {
        var self = this;
        this.setState(self.getInitialState());
    },
    change(val) {
        var self = this;

        var arrow = '';
        var oldRoute = this.state.route;
        if (oldRoute !== this.getDefaultRoute()) {
            arrow = ' > ';
        } else {
            oldRoute = '';
        }

        var value;
        var route;

        // val is null on the clear event
        if (!val) {
            value = '';
            route = self.state.route;
        } else {
            value = val.value;
            route = oldRoute + arrow + value
        }

        self.setState({
            // selected: value,
            select: '',
            route: route
        });
    },
    render() {
        // https://www.online-utility.org/text/sort.jsp
        var data = [
            "300",
            "NF-4610",
            "NF-4615/Swede Rd",
            "Bachy West XC",
            "Ben's",
            "Bushwhacking",
            "COD",
            "COD Rockstacker",
            "Catch & Release",
            "DRT",
            "Dinah Moe Humm",
            "Duodenum",
            "ELV",
            "EXT",
            "Edison Sno Park",
            "Edison-Lava",
            "Expressway",
            "Farewell",
            "Flagline Access",
            "Flagline Tie",
            "Flagline",
            "Funner",
            "Grand Slam",
            "Helipad",
            "Horse Butte",
            "Horse Ridge",
            "KGB",
            "Kent's",
            "Kiwa Butte",
            "Lone Wolf",
            "Lower Whoops",
            "MTB",
            "Marvin's Garden",
            "Metolius-Windigo",
            "Mrazek",
            "Northfork",
            "Old Dirty Pirate",
            "Phil's",
            "Pinedrops",
            "Ridge Loop",
            "S.S.T.",
            "Sector 16",
            "Shevlin Park",
            "Skyliner",
            "Southfork",
            "Larsen",
            "Storm King",
            "Swamp Wells",
            "Swampy",
            "Swampy/Dutchman",
            "Swede Ridge",
            "Tetherow Connector",
            "Ticket to Ride",
            "Ticket to Ride South",
            "Ticket to Ride North",
            "Tiddlywinks",
            "Tumalo Creek",
            "Tumalo Ridge",
            "Tumalo Tie",
            "Tyler's Traverse",
            "Unknown",
            "Upper Whoops",
            "Vista Butte",
            "VooDoo",
            "VooDoo Child",
            "Waldo Lake",
            // Horse Ridge
            "Escape from Moscow",
            "Parkway",
            "Mad Max Drive",
            "Dry River Canyon",
            "Crooked Arm",
            "Crazyhorse",
            "Holy Loop",
            "Has No Horse",
            "Sand Canyon",
            "SST"
        ];
        
        var extraData = [
       		"Tumalo Ridge > Swede Ridge > Swampy > Southfork > Tumalo Creek",
       		"Storm King > Tiddlywinks > Larsen > Tyler's Traverse > Catch & Release > Storm King",
       	];

        var options = _.chain(data)
            .map(function(item) {
                return {
                    label: item,
                    value: item
                }
            })
            .sortBy(function (item) { return item.label.toUpperCase() })
            .value();
            
        options = _.chain(extraData)
        	.map(function(item) {
                return {
                    label: item,
                    value: item
                }
            })
            .sortBy(function (item) { return item.label.toUpperCase() })
            .union(options)
            .value();

        var confirm = null;
        if (this.state.open) {
            confirm = (
                <div>
                    <ReactInterval
                        timeout={3000}
                        enabled={true}
                        callback={() => this.setState({open: false})}
                    />

                    <Collapse in={this.state.open}>
                        <div>
                            <Panel header="Success" bsStyle="success">
                                Route was copied to your clipboard!
                           </Panel>
                        </div>
                    </Collapse>
                </div>
            );
        }

        return (

                    <div className='container'>
                        <div className='row'>
                            <div className='padding-top col-xs-12 col-md-12 col-lg-12'>
		
                            <ControlLabel>Trails</ControlLabel>

                            <Select
                                    name='trail'
                                    value={this.state.selected}
                                    options={options}
                                    onChange={this.change}
                                    autofocus={true}
                                    noResultsText='No trails found'
                                    placeholder='Select a trail'
                                    matchPos='start'
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='padding-top col-xs-12 col-md-12 col-lg-12'>
                                {confirm}
                            </div>
                        </div>

                        <div className='row'>
                            <div className='padding-top col-xs-12 col-md-12 col-lg-12'>
                            <Panel>
                                {this.state.route}
                            </Panel>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='padding-top col-xs-12 col-md-12 col-lg-12'>
                                <Button disabled={this.state.route === this.getDefaultRoute()} onClick={()=>this.setState({open: true})} data-clipboard-text={this.state.route} bsStyle='primary' className='copy' bsSize='large' block>Copy</Button>
                                <Button onClick={()=>this.handleClick(this)} bsStyle='danger' className='copy' bsSize='large' block>Clear</Button>
                            </div>
                        </div>
                        
                        <div className='row text-center'>
                            <div className='padding-top col-xs-12 col-md-12 col-lg-12'>                            
                             <div class="list-group">
                             	<a href="https://emojipedia.org/" class="list-group-item list-group-item-action" target="_blank">Emojipedia</a> |
                             	<a href="https://www.bendtrails.org/" class="list-group-item list-group-item-action" target="_blank"> Bend Trails</a>
                             </div> 
                             </div>
                        </div>
                        

                        <p className='text-center'>
                            <small>v0.0.8</small>
                        </p>
                    </div>
        );
    }
});

export default App;
