# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker3.Repo.insert!(%Tasktracker3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasktracker3.Repo
  alias Tasktracker3.Users.User
  alias Tasktracker3.Tasks.Task
  def run do
    p1 = Comeonin.Argon2.hashpwsalt("password1")
    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "JrTrump" , email: "trump@usprez.com" , password_hash: p1 })
    b = Repo.insert!(%User{ name: "Chuck" ,email: "chucknorris@possible.com" , password_hash: p1 })
    c = Repo.insert!(%User{ name: "Gengis" ,email: "conqurergengis@mongol.com" , password_hash: p1 })
    d = Repo.insert!(%User{ name: "Arnold" ,email: "arnold@goldgym.com" , password_hash: p1 })


    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: b.id, title: "Title 1", description: "Describing Taks 1",  time_taken: 30, completed: false, assigned_to: "Chuck"})
    Repo.insert!(%Task{ user_id: c.id, title: "Title 2", description: "Describing Taks 2", time_taken: 15, completed: true, assigned_to: "Chuck"})
    Repo.insert!(%Task{ user_id: a.id, title: "Title 3", description: "Describing Taks 3", time_taken: 45, completed: true, assigned_to: "JrTrump"})
    Repo.insert!(%Task{ user_id: b.id, title: "Title 4", description: "Describing Taks 4", time_taken: 45, completed: true, assigned_to: "Gengis"})
  end
end

Seeds.run
