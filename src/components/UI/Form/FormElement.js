import React from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, Input, Label} from "reactstrap";

const FormElement = ({propertyName, title, value, error, children, ...props}) => {
    return (
        <FormGroup row>
            <Label sm={2} for={propertyName}>{title}</Label>
            <Col sm={10}>
                <Input
                    name={propertyName} id={propertyName}
                    invalid={!!props.error}
                    {...props}
                >
                    {children}
                </Input>
                {error && (
                    <FormFeedback>
                        {error}
                    </FormFeedback>
                )}
            </Col>
        </FormGroup>
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    error: PropTypes.string
};

export default FormElement;
