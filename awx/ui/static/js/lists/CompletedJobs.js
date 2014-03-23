/*********************************************
 *  Copyright (c) 2014 AnsibleWorks, Inc.
 *
 *  CompletedJobs.js 
 *
 * 
 */

'use strict';

angular.module('CompletedJobsDefinition', [])
    .value( 'CompletedJobsList', {
        
        name: 'completed_jobs',
        iterator: 'completed_job',
        editTitle: 'Completed Jobs',
        index: false,
        hover: true,
        well: false,
        
        fields: {
            id: {
                label: 'Job ID',
                linkTo: '/#/jobs/{{ completed_job.id }}',
                key: true,
                desc: true,
                searchType: 'int',
                columnClass: 'col-lg-1 col-md-2 col-sm-2 col-xs-2'
            },
            modified: {
                label: 'Completed On',
                link: false,
                searchable: false,
                filter: "date:'MM/dd/yy HH:mm:ss'",
                columnClass: "col-md-2 hidden-xs"
            },
            type: {
                label: 'Type',
                link: false,
                columnClass: "col-md-2 hidden-sm hidden-xs"
            },
            name: {
                label: 'Name',
                columnClass: 'col-sm-4 col-xs-5',
                ngHref: 'nameHref'
            },
            failed: {
                label: 'Job failed?',
                searchSingleValue: true,
                searchType: 'boolean',
                searchValue: 'true',
                searchOnly: true,
                nosort: true
            }
        },
        
        actions: {
            refresh: {
                mode: 'all',
                awToolTip: "Refresh the page",
                ngClick: "refresh()"
            }
        },

        fieldActions: {
            status: {
                mode: 'all',
                awToolTip: "{{ completed_job.status_tip }}",
                awTipPlacement: "top",
                dataTitle: "{{ completed_job.status_popover_title }}",
                iconClass: 'fa icon-job-{{ completed_job.status }}',
                awPopOver: "{{ completed_job.status_popover }}",
                dataPlacement: 'left'
            },
            submit: {
                icon: 'icon-rocket',
                mode: 'all',
                ngClick: 'submitJob(completed_job.id, completed_job.summary_fields.job_template.name)',
                awToolTip: 'Relaunch the job',
                dataPlacement: 'top'
            },
            cancel: {
                mode: 'all',
                ngClick: 'deleteJob(completed_job.id)',
                awToolTip: 'Cancel a running or pending job',
                ngShow: "completed_job.status == 'pending' || completed_job.status == 'running' || completed_job.status == 'waiting'",
                dataPlacement: 'top'
            },
            "delete": {
                mode: 'all',
                ngClick: 'deleteJob(completed_job.id)',
                awToolTip: 'Delete the job',
                ngShow: "completed_job.status != 'pending' && completed_job.status != 'running' && completed_job.status != 'waiting'",
                dataPlacement: 'top'
            },
            dropdown: {
                type: 'DropDown',
                label: 'View',
                icon: 'fa-search-plus',
                'class': 'btn-default btn-xs',
                options: [
                    { ngClick: 'editJob(completed_job.id, completed_job.summary_fields.job_template.name)', label: 'Status' },
                    { ngClick: 'viewEvents(completed_job.id, completed_job.summary_fields.job_template.name)', label: 'Events',
                        ngHide: "completed_job.status == 'new'" },
                    { ngClick: 'viewSummary(completed_job.id, completed_job.summary_fields.job_template.name)', label: 'Host Summary',
                        ngHide: "completed_job.status == 'new'" }
                ]
            }
        }
    });
