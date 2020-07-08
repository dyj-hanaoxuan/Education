import React from 'react'
import AddCourse from '../../Components/Add/AddCourse'

// 必修课时管理组件
class RequiredCourseTime extends React.Component {
    render() {
        return (
            <div>
            必修课时管理组件
                <AddCourse/>
            </div>
        )
    }
}

export {RequiredCourseTime as default}