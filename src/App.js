import React from 'react';
import './App.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button, Collapse, Panel, ControlLabel } from 'react-bootstrap';
import Clipboard from 'clipboard';
import _ from 'underscore';
import ReactInterval from 'react-interval';

// npm run build && cd build && scp -r * clark@c2.dev.everylayer.com:~/routes

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
        var data = [
            "COD",
            "300",
            "4610",
            "4615",
            "Bachy West XC",
            "Ben's",
            "Catch & Release",
            "Dinah Moe Humm",
            "DRT",
            "Duodenum",
            "Edison Sno Park",
            "ELV",
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
            "Kent's",
            "KGB",
            "Kiwa Butte",
            "Steve Larsen's",
            "Lower Whoops",
            "Marvin's Garden",
            "Metolius-Windigo",
            "Mrazek",
            "MTB",
            "Northfork",
            "Old Dirty Pirate",
            "Phil's",
            "Pinedrops",
            "S.S.T.",
            "Sector 16",
            "Shevlin Park",
            "Skyliner",
            "Southfork",
            "Storm King",
            "Swamp Wells",
            "Swampy",
            "Swampy/Dutchman",
            "Swede Ridge",
            "Tetherow Connector",
            "Ticket to Ride",
            "Tiddlywinks",
            "Tumalo Creek",
            "Tumalo Ridge",
            "Tumalo Tie",
            "Tyler's Traverse",
            "Unknown",
            "Upper Whoops",
            "Vista Butte",
            "VooDoo",
            "Waldo Lake",
            "EXT",
            "Edison-Lava",
            // Horse Ridge
            "Escape from Moscow",
            "Parkway",
            "Mad Max Drive",
            "Dry River Canyon",
            "Crooked Arm",
            "Crazyhorse",
            "Holy Loop",
            "Has No Horse",
            "Sand Canyon"
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

                        <p className='text-center'>
                            <small>v0.0.6</small>
                        </p>
                    </div>
        );
    }
});

export default App;