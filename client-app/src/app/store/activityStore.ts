import { IActivity } from "./../models/activity";
import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

configure({ enforceActions: "always" });
class ActivityStore {
  @observable activityRegistery = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target: string = "";

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistery.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (err) {
      console.log(err);
      runInAction("load activities on error", () => {
        this.loadingInitial = false;
      });
    }
  };
  @computed get sortByDate() {
    return Array.from(this.activityRegistery.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }
  @action createActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.create(activity);
      runInAction("creating an activity", () => {
        this.activityRegistery.set(activity.id, activity);
        this.editMode = false;
        this.selectedActivity = activity;
        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
      runInAction("create an activity on error", () => {
        this.submitting = false;
      });
    }
  };
  @action openCreateForm = () => {
    this.selectedActivity = undefined;
    this.editMode = true;
  };
  @action editActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.update(activity);
      runInAction("editing an activity", () => {
        this.activityRegistery.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
      runInAction("edit an activity on error", () => {
        this.submitting = false;
      });
    }
  };
  @action setEditMode = (editMode: boolean) => {
    this.editMode = editMode;
  };
  @action deleteActivity = async (e: string, id: string) => {
    try {
      this.submitting = true;
      this.target = e;
      await agent.Activities.del(id);
      runInAction("deleting an activity", () => {
        this.activityRegistery.delete(id);
        this.submitting = false;
        this.selectedActivity = undefined;
      });
    } catch (err) {
      console.log(err);
      runInAction("delete an activity on error", () => {
        this.submitting = false;
      });
    }
  };
  @action setSelectedActivity = (activity: IActivity | undefined) => {
    this.selectedActivity = activity;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistery.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
