class AddWidgetToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :widget, :string
  end
end
