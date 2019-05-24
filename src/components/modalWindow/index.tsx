import React, { Component } from 'react';

import styles from './modal.module.css';

interface IModalProps {
    onClose(): void;
}

interface IModalState {
    isClose: boolean;
}

export class ModalError extends Component<IModalProps, IModalState> {
    state: IModalState = {
        isClose: false
    };

    handleClose = () => {
        this.props.onClose();
        this.setState({isClose: true});
    };

    render() {
        const {isClose} = this.state;

        const modalContainer = isClose ? styles.modalContainer_close : styles.modalContainer;
        console.log(modalContainer);

        return (
            <div className={modalContainer}>
                <div className={styles.modal}>
                    <span className={styles.modal__closeIcon} onClick={this.handleClose}/>
                    <span className={styles.modal__text}>
                    Введённый язык не соответствует выбранному, возможно вы не найдёте, то что ищите
                </span>
                </div>
            </div>
        );
    }
}
