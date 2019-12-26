import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireDatabaseModule
} from "@angular/fire/database";

@Injectable()
export class ChallengeService {
  todoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) {}

  get() {
    this.todoList = this.firebasedb.list("titles");
    return this.todoList;
  }

  add(title: string) {
    this.todoList.push({
      title: title,
      isChecked: false
    });
  }

  switch($key: string, flag: boolean) {
    this.todoList.update($key, { isChecked: flag });
  }

  remove($key: string) {
    this.todoList.remove($key);
  }
}
