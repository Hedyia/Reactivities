import { IActivity } from "./../models/activity";
import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

configure({ enforceActions: "always" });
class ActivityStore {
  @observable activityRegistery = new Map();
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
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
  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting an activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (err) {
        runInAction("get an activity error", () => {
          this.loadingInitial = false;
        });
        console.log(err);
      }
    }
  };
  @action clearActivity = () => {
    this.activity = null;
  };
  getActivity = (id: string) => {
    return this.activityRegistery.get(id);
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
        this.activity = activity;
        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
      runInAction("create an activity on error", () => {
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.update(activity);
      runInAction("editing an activity", () => {
        this.activityRegistery.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
      runInAction("edit an activity on error", () => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (e: string, id: string) => {
    try {
      this.submitting = true;
      this.target = e;
      await agent.Activities.del(id);
      runInAction("deleting an activity", () => {
        this.activityRegistery.delete(id);
        this.submitting = false;
        this.activity = null;
      });
    } catch (err) {
      console.log(err);
      runInAction("delete an activity on error", () => {
        this.submitting = false;
      });
    }
  };
  @action setSelectedActivity = (activity: IActivity | null) => {
    this.activity = activity;
  };
}

export default createContext(new ActivityStore());
