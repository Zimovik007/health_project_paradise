import React from "react";
import {Spinner, Form} from "react-bootstrap";


class StageInfo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            categories: props.deletedCategories,
            city: props.city,
        };

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            categories: nextProps.deletedCategories,
            city: nextProps.city
        });
    }
    
    render(){
        console.log(this.state);
        return(
            <div>
                <h4 align="left">Информация о раунде:</h4>
                <ul style={{ textAlign: 'left' }}>
                    <li>Город: {this.state.city}</li>
                    {(this.state.categories.length) ? <li>Запрещенные категории: { this.state.categories.join(', ') }</li> : null}
                </ul>
            </div>
        );
    }
}

export default StageInfo;