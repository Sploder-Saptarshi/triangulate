// ControlPanel
import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
const loadImage = require('../node_modules/blueimp-load-image/js/load-image.all.min.js')
console.log('load image', loadImage)
let styles = {
    slider: {
        marginTop: '0px'
    }
};

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            modalOpen: false
        }
    }
    handleModal() {
        let open = this.state.modalOpen === true
            ? false
            : true;
        this.setState({modalOpen: open})

    }
    uploadFile(e) {
        console.log('event ', e.target.files[0],)
        loadImage(e.target.files[0], function (img) {
            console.log('img ', img);
            img.id = "rawCanvas";
            img.className += "hero";
            this
                .props
                .handleImage(img)
        }.bind(this), {
            orientation: true,
            canvas: true
        });
    }
    // handleModalClose() {     this.setState({modalOpen: value}) }
    render() {
        console.log(this.props.thresholdSettings)
        return (
            <div>
                <Drawer open={this.state.open}>
                    <RaisedButton containerElement='label' label='Upload File'>
                        <input
                            onChange={this
                            .uploadFile
                            .bind(this)}
                            type="file"
                            style={{
                            display: 'none'
                        }}/>
                    </RaisedButton>
                    {this
                        .props
                        .controls
                        .map(function (control) {
                            switch (control.type) {
                                case 'select':
                                    return <SelectField
                                        floatingLabelText={control.label}
                                        value={this.props.status[control.id]}
                                        style={{
                                        width: "100%"
                                    }}
                                        onChange={(e, key, val) => this.props.update(e, control.id, val)}>
                                        {control
                                            .options
                                            .map(function (d) {
                                                return (<MenuItem key={control.id + '-' + d.id} value={d.id} primaryText={d.label}/>)
                                            })}
                                    </SelectField>
                                    break;
                                case 'header':
                                    return <div>
                                        <h3>{control.label}</h3>
                                        <hr/>
                                    </div>
                                    break;
                                case 'slider':
                                    return <div>
                                        <label>{control.getLabel(this.props.status[control.id])}</label>
                                        <Slider
                                            id={control.id}
                                            min={control.min}
                                            max={control.max}
                                            step={control.step}
                                            disabled={control.getDisabled === undefined
                                            ? false
                                            : control.getDisabled(this.props.disabled)}
                                            onChange={(e, val) => this.props.update(e, control.id, val)}
                                            defaultValue={this.props.status[control.id]}
                                            sliderStyle={styles.slider}/>
                                    </div>
                                    break;
                                case 'checkbox':
                                    return <Checkbox
                                        checked={this.props.status[control.id]}
                                        label={control.label}
                                        onCheck={(e, val) => this.props.update(e, control.id, val)}/>
                                    break;
                                case 'radio':
                                    return <RadioButtonGroup
                                        name={control.id}
                                        defaultSelected={this.props.status[control.id]}>
                                        {control
                                            .options
                                            .map(function (d) {
                                                return (<RadioButton key={control.id + "-" + d.id} value={d.id} label={d.label}/>)
                                            })}
                                    </RadioButtonGroup>
                                    break;
                                case 'toggle':
                                    return <Toggle
                                        label={control.label}
                                        style={styles.toggle}
                                        toggled={this.props.status[control.id]}
                                        disabled={control.getDisabled === undefined
                                        ? false
                                        : control.getDisabled(this.props.disabled)}
                                        onToggle={(e, val) => this.props.update(e, control.id, val)}/>
                            }
                        }.bind(this))}
                    <RaisedButton
                        label="About"
                        onClick={this
                        .handleModal
                        .bind(this)}/>
                    <Dialog
                        title="About"
                        modal={false}
                        open={this.state.modalOpen}
                        onRequestClose={this
                        .handleModal
                        .bind(this)}>
                        <p>This project uses a &nbsp;
                            <a
                                href="https://github.com/d3/d3/blob/master/API.md#voronoi-diagrams-d3-voronoi"
                                target="_blank">Voronoi Diagram</a>&nbsp;
                            to randomly sample points from an image to construct an abstracted
                            representation of it. It was built based on&nbsp;
                            <a href="https://bl.ocks.org/mbostock/4341156">this example</a>&nbsp; that
                            expresses the Delaunay Triangulation used to compute a Voronoi Diagram.
                            See&nbsp;
                            <a href="https://github.com/mkfreeman/triangulate" target="_blank">code</a>&nbsp; on GitHub.</p>
                        Hexagon, circle, and smoothing functionality built by&nbsp;
                        <a
                            href="https://scholar.google.com/citations?user=247cncgAAAAJ"
                            target="_blank">Alex Rand</a>.
                    </Dialog>
                </Drawer>
            </div>
        )
    }
}
export default ControlPanel;