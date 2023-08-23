class RenameTitleToName < ActiveRecord::Migration[7.0]
  def change
    rename_column :channels, :title, :name
  end
end
