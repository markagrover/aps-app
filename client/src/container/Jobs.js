import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from'react-toolbox/lib/button/Button';

class Jobs extends Component {
    componentWillMount(){
        this.props.fetchJobs();
    }
    async onEdit(e){
        const target = e.target.dataset.id;
        await this.props.editJob(target);
        this.props.history.push(`/jobs/edit/${target}`);

    }
    async onViewJob(e){
        const target = e.target.dataset.id;
        await this.props.fetchJob(target);
        this.props.history.push(`/jobs/${target}`);
    }
   async onDelete(e){
        const id = e.target.dataset.id;
       await this.props.deleteJob(id);
        this.props.fetchJobs();
    }
    renderJobs(){
        if(this.props.jobs){
            return this.props.jobs.map((job, i) => {
                return (
                    <li key={i} style={{
                        border: '1px solid black',
                        borderRadius: '10px',
                        padding: '10px',
                        margin: '10px',
                        listStyle: 'none'
                    }}>
                        <p>Job Type: {job.type}</p>

                        <Button onClick={this.onEdit.bind(this)} data-id={job._id} icon='edit' label='EDIT' flat primary />
                        <Button onClick={this.onDelete.bind(this)} data-id={job._id} icon='delete' label='DELETE' flat primary />
                        <Button onClick={this.onViewJob.bind(this) } data-id={job._id} label={'VIEW JOB'}/>
                    </li>
                );
            })
        }

    }
    render() {
        return (
            <div>
                <h2>Jobs</h2>
                <ul>
                    {this.renderJobs()}
                </ul>
            </div>

        );
    }
}

function mapStateToProps({jobs}) {
    return {
        jobs
    };
}

export default connect(mapStateToProps, actions)(Jobs);
