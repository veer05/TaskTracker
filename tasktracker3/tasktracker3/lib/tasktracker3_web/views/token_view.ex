defmodule Tasktracker3Web.TokenView do
  use Tasktracker3Web, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      user_name: user.name,
      token: token,
    }
  end
end