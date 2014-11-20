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
    }
  },
  
  remaining: function() {
    return this.filterBy("isCompleted", false).get("length");
  }.property("@each.isCompleted"),

  inflection: function() {
    return this.get("remaining") === 1 ? "item" : "items";
  }.property("remaining"),

  completedTotal: function() {
    return this.get("model").get("length") - this.get("remaining");
  }.property("remaining")
});
