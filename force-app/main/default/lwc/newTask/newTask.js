import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import createTask from '@salesforce/apex/CreateTaskController.createTask';


export default class ToDoApp extends LightningElement {
    @track type;
    @track priority;
    @track subject;
    @track description;
    @track activityDate;
    @track error;
    
    get typePicklistValues(){
        return [
            { label: 'Call', value: 'Call'},
            { label: 'Meeting', value: 'Meeting'},
            { label: 'Other', value: 'Other'},
            { label: 'Email', value: 'Email'}
        ];
    }
    get priorityPicklistValues(){
        return [
            { label: 'High', value: 'High'},
            { label: 'Normal', value: 'Normal'},
            { label: 'Low', value: 'Low'}
        ];
    }
    handleTypeChange(event){
        this.type = event.target.value;
    }
    handlePriorityChange(event){
        this.priority = event.target.value;
    }
    handleSubjectChange(event){
        this.subject = event.target.value;
    }
    handleDescriptionChange(event){
        this.description = event.target.value;
    }
    handleDescriptionChange(event){
        this.activityDate = event.target.value;
    }


    addTask() {
        createTask( { subject: this.subject, description: this.description, priority: this.priority, type: this.type } )
        .then( data => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Task created',
                        variant: 'success'
                    })
                );
                this.subject='';
                this.priority='';
                this.description='';
                this.type='';
            })
        .catch(error => {
            this.error = 'Unknown error';
            if (Array.isArray(error.body)) {
                this.error = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                this.error = error.body.message;
            }

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: this.error,
                    variant: 'error'
                })
            );
        })    
    }
}