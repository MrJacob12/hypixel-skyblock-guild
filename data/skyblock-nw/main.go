package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"sort"
	"time"

	"github.com/SkyCryptWebsite/SkyHelper-Networth-Go"
	"github.com/DuckySoLucky/SkyCrypt-Types"
)

type PlayerDBResponse struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Data    struct {
		Player struct {
			Username string `json:"username"`
		} `json:"player"`
	} `json:"data"`
}

type LeaderboardMember struct {
	Rank           int     `json:"rank"`
	Username       string  `json:"username"`
	UUID           string  `json:"uuid"`
	Value          float64 `json:"value"`
	FormattedValue string  `json:"formattedValue"`
}

type LeaderboardCategory struct {
	Category    string              `json:"category"`
	LastUpdated string              `json:"lastUpdated"`
	Members     []LeaderboardMember `json:"members"`
}

type LeaderboardRoot struct {
	Leaderboards map[string]LeaderboardCategory `json:"leaderboards"`
}

type IronmanData struct {
	Data []skycrypttypes.Profile `json:"data"`
}

var nameCache = make(map[string]string)

func getUsername(uuid string) string {
	if name, ok := nameCache[uuid]; ok {
		return name
	}
	url := fmt.Sprintf("https://playerdb.co/api/player/minecraft/%s", uuid)
	resp, err := http.Get(url)
	if err != nil || resp.StatusCode != 200 {
		return uuid
	}
	defer resp.Body.Close()
	var pData PlayerDBResponse
	if err := json.NewDecoder(resp.Body).Decode(&pData); err != nil {
		return uuid
	}
	username := pData.Data.Player.Username
	nameCache[uuid] = username
	return username
}

func formatNumber(n float64) string {
	if n >= 1_000_000_000 {
		return fmt.Sprintf("%.2fB", n/1_000_000_000)
	}
	if n >= 1_000_000 {
		return fmt.Sprintf("%.2fM", n/1_000_000)
	}
	if n >= 1_000 {
		return fmt.Sprintf("%.2fK", n/1_000)
	}
	return fmt.Sprintf("%.2f", n)
}

func sortLeaderboard(list []LeaderboardMember) {
	sort.Slice(list, func(i, j int) bool {
		return list[i].Value > list[j].Value
	})
	for i := range list {
		list[i].Rank = i + 1
	}
}

func main() {
	file, err := os.ReadFile("active_ironman_profiles.json")
	if err != nil {
		return
	}

	var response IronmanData
	if err := json.Unmarshal(file, &response); err != nil {
		return
	}

	var nwList []LeaderboardMember
	var topItemList []LeaderboardMember

	for _, profile := range response.Data {
		for uuid, memberData := range profile.Members {
			username := getUsername(uuid)
			m := memberData
			calc, err := skyhelpernetworthgo.NewProfileNetworthCalculator(&m, nil, 0)
			if err != nil {
				continue
			}

			nw := calc.GetNetworth()

			nwList = append(nwList, LeaderboardMember{
				Username:       username,
				UUID:           uuid,
				Value:          nw.Networth,
				FormattedValue: formatNumber(nw.Networth),
			})

			var topPrice float64
			var topName string
			for _, cat := range nw.Types {
				for _, item := range cat.Items {
					if item.Price > topPrice {
						topPrice = item.Price
						topName = item.Name
					}
				}
			}

			if topName == "" {
				topName = "None"
			}

			topItemList = append(topItemList, LeaderboardMember{
				Username:       username,
				UUID:           uuid,
				Value:          topPrice,
				FormattedValue: fmt.Sprintf("%s (%s)", topName, formatNumber(topPrice)),
			})
		}
	}

	sortLeaderboard(nwList)
	sortLeaderboard(topItemList)

	now := time.Now().Format("2006-01-02 15:04:05")
	finalData := LeaderboardRoot{
		Leaderboards: map[string]LeaderboardCategory{
			"Networth": {
				Category:    "Networth",
				LastUpdated: now,
				Members:     nwList,
			},
			"Most Expensive Item": {
				Category:    "Most Expensive Item",
				LastUpdated: now,
				Members:     topItemList,
			},
		},
	}

	output, _ := json.MarshalIndent(finalData, "", "  ")
	os.WriteFile("leaderboards.json", output, 0644)
}