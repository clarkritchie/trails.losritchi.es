import React, { useState, useEffect } from 'react';
import './App.css';
import Select from 'react-select';
import { Button, Collapse, Alert, Form } from 'react-bootstrap';
import Clipboard from 'clipboard';
import _ from 'underscore';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = require('./routes');
const extraData = require('./extra-routes');
const packageJson = require('../package.json');

const App = () => {
    const getDefaultRoute = () => 'None';
    
    const [selected, setSelected] = useState('');
    const [route, setRoute] = useState(getDefaultRoute());
    const [open, setOpen] = useState(false);
    const version = packageJson.version;

    useEffect(() => {
        new Clipboard('.copy');
    }, []);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => setOpen(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleClick = () => {
        setSelected('');
        setRoute(getDefaultRoute());
    };

    const change = (val) => {
        let arrow = '';
        let oldRoute = route;
        if (oldRoute !== getDefaultRoute()) {
            arrow = ' > ';
        } else {
            oldRoute = '';
        }

        let value;
        let newRoute;

        if (!val) {
            value = '';
            newRoute = route;
        } else {
            value = val.value;
            newRoute = oldRoute + arrow + value;
        }

        setSelected('');
        setRoute(newRoute);
    };

    const options = _.chain(data)
        .map(function(item) {
            return {
                label: item,
                value: item
            }
        })
        .sortBy(function (item) { return item.label.toUpperCase() })
        .value();

    const extraOptions = _.chain(extraData)
        .map(function(item) {
            return {
                label: item,
                value: item
            }
        })
        .sortBy(function (item) { return item.label.toUpperCase() })
        .value();

    const confirm = open ? (
        <div>
            <Collapse in={open}>
                <div>
                    <Alert variant="success">
                        Route was copied to your clipboard!
                    </Alert>
                </div>
            </Collapse>
        </div>
    ) : null;

    return (
        <div className='container'>
            <div className='row'>
                <div className='padding-top col-xs-12 col-md-12 col-lg-12'>
                    <Form.Label className='text-muted'>Individual Trails</Form.Label>
                    <Select
                        name='trail'
                        value={selected}
                        options={options}
                        onChange={change}
                        autoFocus={true}
                        noOptionsMessage={() => 'No trails found'}
                        placeholder='Select a trail'
                        isClearable
                    />
                </div>
            </div>

            <div className='row'>
                <div className='padding-top col-xs-12 col-md-12 col-lg-12'>
                    <Form.Label className='text-muted'>Common Rides</Form.Label>
                    <Select
                        name='trail'
                        value={selected}
                        options={extraOptions}
                        onChange={change}
                        autoFocus={true}
                        noOptionsMessage={() => 'No trails found'}
                        placeholder='Select a trail'
                        isClearable
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
                    <Form.Label htmlFor='final' className='text-muted'>Final Route</Form.Label>
                    <Alert variant='light' className='border'>
                        {route}
                    </Alert>
                </div>
            </div>

            <div className='row'>
                <div className='padding-top col-xs-12 col-md-12 col-lg-12'>
                    <Button 
                        disabled={route === getDefaultRoute()} 
                        onClick={() => setOpen(true)} 
                        data-clipboard-text={route} 
                        variant='primary' 
                        className='copy' 
                        size='lg' 
                        style={{width: '100%', marginBottom: '10px'}}
                    >
                        Copy
                    </Button>
                    <Button 
                        onClick={handleClick} 
                        variant='danger' 
                        className='copy' 
                        size='lg' 
                        style={{width: '100%'}}
                    >
                        Clear
                    </Button>
                </div>
            </div>

            <div className='row text-center'>
                <div className='padding-top col-xs-12 col-md-12 col-lg-12'>
                    <div className="list-group">
                        <a href="https://emojipedia.org/" className="list-group-item list-group-item-action" target="_blank" rel="noopener noreferrer">Emojipedia</a> |
                        <a href="https://www.bendtrails.org/" className="list-group-item list-group-item-action" target="_blank" rel="noopener noreferrer"> Bend Trails</a>
                    </div>
                </div>
            </div>

            <p className='text-center'>
                <small>v{version}</small>
            </p>
        </div>
    );
};

export default App;
