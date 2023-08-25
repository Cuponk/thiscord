class Membership < ApplicationRecord
    validates :user_id, :membershipable_id, :membershipable_type, presence: true

    belongs_to :membershipable, polymorphic: true
    belongs_to :user
end
