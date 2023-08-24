class Server < ApplicationRecord
    validates :name, :owner_id, presence: true

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User

    has_one_attached :photo

    has_many :channels,
        dependent: :destroy

    has_many :memberships,
        as: :membershipable,

    has_many :users,
        through: :memberships,
        source: :user
end
