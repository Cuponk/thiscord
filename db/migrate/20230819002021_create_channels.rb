class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :title, null: false
      t.references :server, foreign_key: true, null: false
      t.timestamps
    end
  end
end
