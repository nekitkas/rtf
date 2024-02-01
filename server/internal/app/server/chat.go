package server

import (
	"net/http"

	"forum/server/pkg/router"
)

func (s *server) handleCreateChat() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		otherUserID := router.Param(r.Context(), "id")

		userExists, err := s.store.User().IsUser(otherUserID)
		if err != nil {
			s.respond(w, r, http.StatusBadRequest, err)
			return
		} else if !userExists {
			s.respond(w, r, http.StatusBadRequest, Response{
				Message: "The user by this ID doesn't exist",
			})
			return
		}

		userID := r.Context().Value(ctxUserID).(string)

		res, err := s.store.Chat().CheckChatExists(userID, otherUserID)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
		}

		var chat_id []string
		if res == nil {
			chat, err := s.store.Chat().Create(userID, otherUserID)
			if err != nil {
				s.error(w, r, http.StatusCreated, err)
			}
			chat_id = append(chat_id, chat.ID)
			s.respond(w, r, http.StatusOK, Response{
				Message: "Successfully created chat",
				Data: map[string][]string{
					"chat_id": chat_id,
				},
			})
			return
		} else {
			chat_id = res
		}

		// fmt.Println(res)
		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully found chat",
			Data: map[string][]string{
				"chat_id": chat_id,
			},
		})
	}
}
