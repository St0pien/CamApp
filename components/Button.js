import React from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ ...styles.btn, ...props.style }}>
            {props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        textAlign: 'center',
    },
});

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object
}

export default Button;
