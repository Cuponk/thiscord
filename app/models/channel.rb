class Channel < ApplicationRecord
    validates :name, :server_id, presence: true

    belongs_to :server,
        foreign_key: :server_id
end
