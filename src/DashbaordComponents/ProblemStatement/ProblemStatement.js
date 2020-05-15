import React, {Component} from 'react';
import Unlock from '../../assets/images/unlock.svg';
import Lock from '../../assets/images/lock.svg';
import New from '../../assets/images/new.svg';
import cookie from 'react-cookies';

import './ProblemStatement.css';

class ProblemStatement extends Component {
    constructor() {
        super();
        this.state = {
            isLock1:false,
            isLock2:false,
            isLock3:false,
            firstStatement:'',
            secondStatement:'',
            thirdStatement:''
        }
    }

    onLock1Click = () => {
        this.setState({
            isLock1:!this.state.isLock1
        })
    }

    onLock2Click = () => {
        this.setState({
            isLock2:!this.state.isLock2
        })
    }

    onLock3Click = () => {
        this.setState({
            isLock3:!this.state.isLock3
        })
    }

    componentWillMount() {
        this.onGenerateNewClick()
    }

    onGenerateNewClick = () => {
        fetch(`http://localhost:8000/user/generateProblem`,{  //${process.env.REACT_APP_BACKEND_URL}
            method: "post",
            headers: {
                'Content-type':'application/json',
                'Authorization': "Bearer "+"djphgGNKBpcOoLL8Jin9TSIexQk1"  //cookie.load('PALETTE').uid
            },
            body: JSON.stringify({
                isLock1: this.state.isLock1,
                isLock2: this.state.isLock2,
                isLock3: this.state.isLock3
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.payload.newDesign!=="Locked") {
                this.setState({
                    firstStatement: data.payload.newDesign
                })
            }

            if(data.payload.newTo!=="Locked") {
                this.setState({
                    secondStatement: data.payload.newTo
                })
            }
            
            if(data.payload.newToHelp!=="Locked") {
                this.setState({
                    thirdStatement: data.payload.newToHelp
                })
            }
        })
    }

    onLockThisClick = () => {
        fetch(`http://localhost:8000/user/lockProblem`,{  //${process.env.REACT_APP_BACKEND_URL}
            method: "post",
            headers: {
                'Content-type':'application/json',
                'Authorization': "Bearer "+"djphgGNKBpcOoLL8Jin9TSIexQk1"  //cookie.load('PALETTE').uid
            },
            body: JSON.stringify({
                value1: this.state.firstStatement,
                value2: this.state.secondStatement,
                value3: this.state.thirdStatement
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.payload.message)
        })
        .catch(err => {
            alert("Problem")
        })
    }

    render() {
        return(
            <div className="problem-statment">
                <div className="problem-statement-title">
                    <h4><strong>Problem Statement</strong></h4>
                </div>
                
                <div className="problems-display">
                        <button className="actual-lock-button" onClick={()=> this.onLock1Click()}>
                            {(this.state.isLock1) ? <img src={Lock} alt="lock" /> : <img src={Unlock} alt="unlock" /> }
                        </button>
                        <span className="problem-statement-category"> Design a {this.state.firstStatement} </span>
                        <button className="actual-lock-button" onClick={()=> this.onLock2Click()}>
                            {(this.state.isLock2) ? <img src={Lock} alt="lock" /> : <img src={Unlock} alt="unlock" /> }
                        </button>
                        <span className="problem-statement-category"> for {this.state.secondStatement} </span>
                        <button className="actual-lock-button" onClick={()=> this.onLock3Click()}>
                            {(this.state.isLock3) ? <img src={Lock} alt="lock" /> : <img src={Unlock} alt="unlock" /> }
                        </button>
                        <span className="problem-statement-category"> to help {this.state.thirdStatement} </span>
                </div>

                <div className="generate-parent">
                    <div className="row4 generate-lock-buttons">
                        <div className="column4">
                            <button className="generate-button" onClick={()=>this.onGenerateNewClick()}><span> <img src={New} alt="new" /> Generate new </span></button>
                        </div>
                        <div className="column4">
                            <button className="generate-button" onClick={()=>this.onLockThisClick()}><span> Lock this! </span></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProblemStatement;
