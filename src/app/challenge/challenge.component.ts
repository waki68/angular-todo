import { Component, OnInit } from "@angular/core";
import { ChallengeModel } from "./challenge.model";
import { ChallengeService } from "./challenge.service";

@Component({
  selector: "app-challenge",
  templateUrl: "./challenge.component.html",
  styleUrls: ["./challenge.component.css"],
  providers: [ChallengeService]
})
export class ChallengeComponent implements OnInit {
  constructor(private challengeService: ChallengeService) {}

  ngOnInit() {
    this.challengeService
      .get()
      .snapshotChanges()
      .subscribe(i => {
        this.todoList_Firebase = [];
        i.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.todoList_Firebase.push(x);
        });
      });

    this.todoList_Firebase.sort((a, b) => {
      return a.isChecked - b.isChecked;
    });
  }

  todoList_Firebase: any[] = [];
  todoList: ChallengeModel[] = [];
  title: string;

  add() {
    this.challengeService.add(this.title);
    this.title = "";
  }

  add_Local() {
    this.todoList.push({
      key: this.maxKey() + 1,
      title: this.title,
      isChecked: false
    });
    this.title = "";
  }

  switch($key: string, isChecked) {
    this.challengeService.switch($key, isChecked);
  }

  switchCheckedStatus_Local(key: number) {
    const checkedStatus = this.todoList.find(i => i.key == key).isChecked;
    this.todoList.find(i => i.key == key).isChecked = !checkedStatus;
  }

  remove($key: string) {
    this.challengeService.remove($key);
  }

  remove_Local(key: number) {
    this.todoList.splice(
      this.todoList.indexOf(this.todoList.find(i => i.key == key)),
      1
    );
  }

  modeChange(e) {
    if (e.target.checked == true) {
    }
  }
  private maxKey(): number {
    return ~~Math.max(...this.todoList.map(item => item.key));
  }
}
