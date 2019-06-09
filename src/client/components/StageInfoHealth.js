import React from "react";


class StageInfoHealth extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            disease: props.disease,
        };

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            categories: nextProps.deletedCategories,
            city: nextProps.city
        });
    }
    
    render(){
        return(
            <div>
                <h4 align="left">Информация о раунде:</h4>
                <ul style={{ textAlign: 'left' }}>
                    <li>Болезнь: {this.state.disease}</li>
                </ul>
            </div>
        );
    }
}

export default StageInfoHealth;