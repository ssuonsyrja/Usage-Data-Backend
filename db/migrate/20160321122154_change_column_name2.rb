class ChangeColumnName2 < ActiveRecord::Migration
  def change
    rename_column :posts, :type, :event_type
  end
end
