import React from 'react'

class Content extends React.Component {
    render() {
        return (
            <div>
                Content
                {this.props.children}
            </div>
        )
    }
}

export {Content as default}