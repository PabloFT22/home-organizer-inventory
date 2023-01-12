class User < ApplicationRecord

    # macros - associations/db-relationships
    has_many :locations
    has_many :items

    # this activate bycrpt for our password digest
    has_secure_password

    # class/scope methods




end
