import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from'react-toolbox/lib/button/Button';
import Job from './Job';

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
        const vid = e.target.dataset.vid;
        const cid = e.target.dataset.cid;
        const jid = e.target.dataset.jid;
        await this.props.fetchJob(jid);
        this.props.history.push(`/vendors/${vid}?showJob=true&jobId=${jid}&clientId=${cid}`);
    }
   async onDelete(e){
        const id = e.target.dataset.id;
       await this.props.deleteJob(id);
        this.props.fetchJobs();
    }
    renderJobs(){
        if(this.props.jobs){
            return this.props.jobs.map((job, i) => {
            const actions = {
        edit: '',
        view: <Button onClick={this.onViewJob.bind(this) } data-id={job._id} label={'VIEW JOB'}/>
    };
                return (
                    <Job job={job} actions={actions}/>
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
