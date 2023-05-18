import { INote } from './note';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-curd',
  templateUrl: './curd.component.html',
  styleUrls: ['./curd.component.css']
})
export class CurdComponent implements OnInit {

  noteform!:FormGroup;
  editform!:FormGroup;
  noteoldData:INote;
  noteobj:INote ={
    id: '',
    note_title: '',
    note_desc: ''
  }

  noteData:any[];
  constructor(private fb:FormBuilder,private nS: NoteService) {
    // for Add only 
    this.noteform = this.fb.group({
      Title:['',Validators.required],
      Desc:['',Validators.required]
    });
 // for edit only
    this.editform = this.fb.group({
      edit_Title:['',Validators.required],
      edit_Desc:['',Validators.required]
    });
   }

  ngOnInit(): void {
    this.getAllNote();
  }

  // Add Note in database
  addNote(){
    const {value} = this.noteform;
    console.log(value);
    this.noteobj.id='';
    this.noteobj.note_title=value.Title;
    this.noteobj.note_desc=value.Desc;
    this.nS.addNote(this.noteobj).then((note)=>{
      if(note){
       this.noteform.reset();  
      }
      else{
        alert("sumething went wrong....");
      }
    });
  }

 // get notwe from database
 
 getAllNote(){
  this.nS.getNote().subscribe((res:INote[])=>{
    this.noteData=res; 
  });
 }

// delete note in database

deleteNote(note:INote){
  let userconfirm = confirm("Are you sure want to delete this note ?");
  if(userconfirm){
    this.nS.deleteNote(note);
  }
}

// update note in database

updateNote(note:INote){

  this.editform.patchValue({
    "edit_Title":note.note_title,
    "edit_Desc":note.note_desc,
  })
  this.noteoldData = note;
  }


  updatedata(){
    
    const{value} = this.editform;
    this.noteobj.id='';
    this.noteobj.note_title=value.edit_Title;
    this.noteobj.note_desc=value.edit_Desc;
    this.nS.updateNote(this.noteoldData,this.noteobj).then((note)=>{        
        this.editform.reset();  
    }).catch((error)=>{
      alert("error::"+ error);
    });
  }
}
