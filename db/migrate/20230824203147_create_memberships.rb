class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :membershipable, polymorphic: true, null: false
      t.timestamps
    end
    add_index :memberships, :membershipable_id
    add_index :memberships, :membershipable_type
  end
end
