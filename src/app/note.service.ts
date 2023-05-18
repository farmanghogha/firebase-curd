import { Injectable } from '@angular/core';
import { INote } from './Fiebase/curd/note';
import { Firestore, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore'
import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService  {

  constructor(private fs:Firestore) { }

  // Add New Note

  addNote(note:INote){
   note.id = doc(collection(this.fs,'id')).id;
   return addDoc(collection(this.fs,'Notes'),note);
  }

  // get all notes

  getNote():Observable<INote[]>{
    let notref = collection(this.fs,'Notes');
    return collectionData(notref,{idField:'id'}) as Observable<INote[]>

  }

// delete notes

deleteNote(note:INote){
 let notref = doc(this.fs,`Notes/${note.id}`);
 return deleteDoc(notref);
}

// update notes

updateNote(note:INote,notes:any){
  let notref = doc(this.fs,`Notes/${note.id}`);
  return updateDoc(notref,notes);
}

}
