import React, { Component } from "react"
import { Modal, ModalBody } from "reactstrap"
import "./Loader.css"


class SuccessNotification extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.tog_notification = this.tog_notification.bind(this);
        // this.toast = this.toast.bind(this);
    }

    tog_notification() {
        this.setState(prevState => ({
            tog_notification: !prevState.tog_notification
        }));
        this.removeBodyCss();
    }
    removeBodyCss() {
        document.body.classList.add("no_padding");
    }


    render() {
        return (

            <div className="response-container">
                <Modal
                    isOpen={this.props.modalState}
                    className="response-modal"
                >
                    <ModalBody style={{ display: 'flex' }}>
                        <div>
                            <i style={{ color: 'rgb(168, 223, 195)' }} className="fa fa-check-circle"></i>
                        </div>
                        <div style={{ paddingLeft: '1em' }}>{this.props.children}</div>
                    </ModalBody>
                </Modal>
            </div>


        )
    }
}

export default SuccessNotification