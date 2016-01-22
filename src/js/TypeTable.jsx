var React = require('react');
var FeatureComponent = require('./FeatureComponent.jsx');

// Each row in the types table on the left side.
var TypeRow = React.createClass({
    getInitialState: function(){
        // we store the state(checked/unchecked) for every type
        // so that when we reload, the state restores.
        
        return {isChecked: false};
    },
    componentDidMount:function(){
        var value = window.localStorage.getItem(this.props.type);
        checked = false;
        if(value == "true"){
            checked = true;
            this.props.watchTypeHandler(this.props.type);
        }
        this.setState({isChecked:checked});
    },
    unwatch: function() {
        var checked = false;
        if(this.state.isChecked){
            this.props.unwatchTypeHandler(this.props.type);
        }
        else{
            checked = true;
            this.props.watchTypeHandler(this.props.type);
        }
        // every time its checked we update the local storage.
        window.localStorage.setItem(this.props.type, checked);
        this.setState({isChecked: checked});
    },
    render: function() {
        return(
                <li>
                    <input
                     id={this.props.type}
                     type="checkbox"
                     key={this.props.type}
                     checked={this.state.isChecked}
                     onChange={this.unwatch}
                     readOnly={false}/>
                    <label htmlFor={this.props.type}>{this.props.type}</label>
                </li>
        );
    }
});

// This is for the table holding the types on the
// left tab.
var TypeTable = React.createClass({
    render: function()  {
        var types = this.props.Types;
            rowObj = [];
            appname = APPNAME;
        for(var type in types){
            rowObj.push(<TypeRow
                         key={type}
                         type={types[type]}
                         unwatchTypeHandler={this.props.unwatchTypeHandler}
                         watchTypeHandler={this.props.watchTypeHandler} />);
        }
        if(types.length < 1) {
            return (
            <div className='left-tab'>
              <div className="highlight-tip left-tip">
                  <strong>No data to view!</strong> Insert data by following this
                  tutorial <a href="http://docs.appbase.io/scalr/rest/intro.html" target="_blank">here</a>.
              </div>
            </div>
            );
        }
        return (
            <div className='left-tab'>
                <div className="row typesList">
                    <h4 className='types-header pull-left col-xs-12'>
                        <span className="pull-left">Types</span>
                    </h4>
                    <ul className='fa-ul types-list clearfix'>
                        {rowObj}
                    </ul>
                </div>
                <div className="ieButton">
                    <ul className="feature-list">
                        <li>
                            <FeatureComponent.ImportData />
                        </li>
                        <li>
                            <FeatureComponent.ExportData 
                            types={this.props.Types} 
                            ExportData ={this.props.ExportData}/>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = TypeTable;