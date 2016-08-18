class AddHostToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :host, :string
  end
end
