import React from "react";


export default class Footer extends React.Component {
    render() {
        const footerStyles = {
            margin: "0px auto",
            textAlign:"center"
            
        };

        return (
            <footer style={footerStyles}>
               
                        <p>Thank you for the opportunity!</p>
            </footer>
        );
    }
}
