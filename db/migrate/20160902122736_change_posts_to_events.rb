class ChangePostsToEvents < ActiveRecord::Migration
  def change
    rename_table :posts, :events
  end
end
