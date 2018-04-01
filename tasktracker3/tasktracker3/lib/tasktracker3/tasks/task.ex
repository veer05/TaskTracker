defmodule Tasktracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :assigned_to, :string
    field :completed, :boolean, default: false
    field :description, :string
    field :time_taken, :integer
    field :title, :string
    #field :user_id, :id
    belongs_to :user, Tasktracker3.Users.User
    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :assigned_to, :description, :completed, :time_taken, :user_id])
    |> validate_required([:title, :assigned_to, :description, :completed, :time_taken, :user_id])
  end
end
