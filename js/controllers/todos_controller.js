Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      var title = this.get("newTitle");
      if (!title) return false;
      if (!title.trim()) return;

      var todo = this.store.createRecord("todo", {
        title: title,
        isCompleted: false
      });

      this.set("newTitle", "");
      todo.save();
    },
    clearCompleted: function() {
      var completed = this.filterBy("isCompleted", true);
      completed.invoke("deleteRecord");
      completed.invoke("save");
    },
  },
  
  remaining: function() {
    return this.filterBy("isCompleted", false).get("length");
  }.property("@each.isCompleted"),

  inflection: function() {
    return this.get("remaining") === 1 ? "item" : "items";
  }.property("remaining"),

  completedTotal: function() {
    return this.get("model").get("length") - this.get("remaining");
  }.property("remaining"),

  hasCompleted: function() {
    return this.get("completedTotal") > 0;
  }.property("completedTotal"),

  allAreDone: function(key, value) {
    if (value === undefined) {
      // this just populates the current value of the checkbox
      return this.get("length") && this.isEvery("isCompleted");
    } else {
      // value of true/false means user clicked checkbox
      this.setEach("isCompleted", value);
      this.invoke("save");
      return value;
    }
  }.property("@each.isCompleted"),
});
