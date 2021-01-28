import React, {ChangeEvent} from 'react';
import './App.css';

const minDigits = 2;
const initialDigits = 3
const maxDigits = 6;

function randomInteger(min: number, max: number) : number {
    const r = Math.random();
    return Math.floor(r * (max - min)) + min;
}


interface AppState
{
    a: number,
    b: number,
    result: number,
    digits: number,
    operation: string
}


function createSum(digits: number) : AppState {
    const d = digits - 1;
    const min = 10 ** d;
    const max = (10 ** (d + 1)) - 1;
    const a_max = max - min;
    const a = randomInteger(min, a_max);
    const b_max = max - a;
    const b = randomInteger(min, b_max);
    const result = a + b;
    return {a, b, result, digits, operation: '+'};
}


function createDifference(digits: number) : AppState {
    const d = digits - 1;
    const min = 10 ** d;
    const max = (10 ** (d + 1)) - 1;
    const a_min = min * 2;
    const a = randomInteger(a_min, max);
    const b_max = a - min;
    const b = randomInteger(min, b_max);
    const result = a - b;
    return {a, b, result, digits, operation: '-'};
}


class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = createSum(initialDigits);
    }

    onDigitsChanged(event: ChangeEvent<HTMLInputElement>) {
        const element = event.target;
        const digits = Number(element.value);
        this.setState(createDifference(digits));
    }

    onAnotherSum() {
        this.setState(createSum(this.state.digits))
    }

    onAnotherDifference() {
        this.setState(createDifference(this.state.digits))
    }

    render() {
        return (
            <div className="App container d-grid gap-4">
                <h1 className="text-center display-2">Arithmetic Problems</h1>
                <div className="row">
                    <div className="col-2" />
                    <div className="problem display-2 text-right col-8">
                        <div>{this.state.a}</div>
                        <div>{this.state.b} {this.state.operation}</div>
                        <div className="answer">{this.state.result}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-1" />
                    <div className="col-2 col-md-4">
                        <label htmlFor="numberDigits" className="form-label">Digits</label>
                    </div>
                    <div className="settings col-8 col-md-4">
                        <input type="range" className="form-range"
                                       min={minDigits} max={maxDigits} value={this.state.digits}
                                       onChange={this.onDigitsChanged.bind(this)} step={1}
                                       id="numberDigits"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1" />
                    <button className="col-4 btn btn-lg btn-primary" onClick={this.onAnotherSum.bind(this)}>Another +</button>
                    <div className="col-2" />
                    <button className="col-4 btn btn-lg btn-primary" onClick={this.onAnotherDifference.bind(this)}>Another -</button>
                    <div className="col-1" />
                 </div>
            </div>
        );
    }
}

export default App;
