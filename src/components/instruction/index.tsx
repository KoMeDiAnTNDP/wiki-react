import React, { Component } from 'react';

import { Plan } from "../steps";
import styles from './instruction.module.css';

interface IInstructionState {
    isClick: boolean;
}

interface IInstructionProps {
    onClick(): void;
}

export class Instruction extends Component<IInstructionProps, IInstructionState> {
    state: IInstructionState = {
        isClick: false
    };

    handleClick = () => {
        this.setState({isClick: !this.state.isClick}, () => {
            setTimeout(this.props.onClick, 1000)
        });
    };

    render() {
        const { isClick }= this.state;
        const instructionClassName = isClick ? styles.wikiSearcher__instruction_close : styles.wikiSearcher__instruction;

        return (
            <div className={instructionClassName}>
                <div className={styles.instruction}>
                    <Plan/>
                    <div className={styles.instruction__legend}>
                        <div className={styles.legend__item}>
                            <span className={styles.legend__requiredIcon}/>
                            <span className={styles.legend__text}> &mdash; обязательные</span>
                        </div>
                        <div className={styles.legend__item}>
                            <span className={styles.legend__optionalIcon}/>
                            <span className={styles.legend__text}> &mdash; опциональные</span>
                        </div>
                    </div>
                    <span className={styles.instruction__closeIcon} onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}
