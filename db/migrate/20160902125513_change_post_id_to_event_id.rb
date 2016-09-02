class ChangePostIdToEventId < ActiveRecord::Migration
  def change
    change_table :comments do |t|
      t.rename :post_id, :event_id
    end
  end
end
