import React from 'react'

class Class extends React.Component {
    render() {
        return (
            <div>
                Class
                {this.props.children}
            </div>
        )
    }
}

export {Class as default}