class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :posts, :title, :event_type
    rename_column :posts, :upvotes, :count
    rename_column :posts, :link, :target
  end
end
