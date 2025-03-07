﻿using NetClubApi.Model;
using NetClubApi.Model.ResponseModel;
using Org.BouncyCastle.Utilities;

namespace NetClubApi.Modules.ClubModule
{

    public interface IClubBussinessLogics
    {
        public Task<List<IClubResponse>> getMyClubs(int user_id);
        public Task<List<IClubResponse>> RegisteredClubs(int user_id);
        public Task<List<IClubResponse>> getClubDetails(List<ClubRegistration> clubs);
        public Task<List<ClubMember>> getClubMembers(string club_label);

        public Task<string> ClubInvitation(string url, string email);



    }
    public class ClubBussinessLogic : IClubBussinessLogics
    {
        private readonly IClubDataAccess _clubDataAccess;
        private readonly IEmailSender _emailSender;

        


        public ClubBussinessLogic(IClubDataAccess clubDataAccess,IEmailSender emailSender)

        {
            _clubDataAccess = clubDataAccess;
            _emailSender = emailSender;
        }

        public async Task<List<IClubResponse>> getMyClubs(int user_id)
        {

            try
            {
                // get the list of clubs created by us
                var clubs = await _clubDataAccess.getCreatedClub(user_id);

                //gathering details for the list of clubs
                return await getClubDetails(clubs);
            }
            catch (Exception)
            {
                throw;
            }


        }


        //gathering details for the list of clubs
        public async Task<List<IClubResponse>> getClubDetails(List<ClubRegistration> clubs)
        {


            try
            {
                List<IClubResponse> listOfClubs = new();
                var value = clubs.Count();
                if (value == 0)
                    return listOfClubs;
                //if admin call the method
                if (clubs[0].isadmin)
                {

                    foreach (var club in clubs)
                    {


                        Club clubdetails = await _clubDataAccess.getClubDetails(club.club_id);
                        if (clubdetails != null)
                        {
                            MyClub myclub = new();
                            myclub.Name = clubdetails.club_name;
                            myclub.Id = clubdetails.Id;
                            // myclub.TotalLeagues = clubdetails.total_league;
                            //myclub.ActiveLeagues = clubdetails.active_league;
                            //myclub.Teams = clubdetails.teams;
                            myclub.TotalLeagues = await getNumberOfLeagues(club.club_id);
                            myclub.ActiveLeagues = 0;
                            myclub.Teams = await getNumberOfTeams(club.club_id) ;
                            myclub.club_label = clubdetails.club_label;

                            listOfClubs.Add(myclub);
                        }
                    }
                }
                //register user call the method
                else
                {
                    foreach (var club in clubs)
                    {


                        Club clubdetails = await _clubDataAccess.getClubDetails(club.club_id);

                        if (clubdetails != null)
                        {
                            RegisterClub registerClub = new();
                            registerClub.Name = clubdetails.club_name;
                            registerClub.JoinDate = club.join_date;
                            //registerClub.LeaguesPlayed = club.league_played;
                            registerClub.CreatedBy = clubdetails.created_by;
                            listOfClubs.Add(registerClub);
                        }
                    }
                }
                return listOfClubs;
            }
            catch (Exception)
            {
                throw;
            }


        }

        public Task<int> getNumberOfTeams(int club_id)
        {
            return _clubDataAccess.getNumberOfTeams(club_id);
        }

        public  Task<int> getNumberOfLeagues(int club_id)
        {
            return _clubDataAccess.getNumberOfLeagues(club_id);
        }

        public async Task<List<IClubResponse>> RegisteredClubs(int user_id)
        {
            try
            {
                var clubs = await _clubDataAccess.getRegisteredClub(user_id);
                return await getClubDetails(clubs);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<ClubMember>> getClubMembers(string club_label)
        {
            int club_id = await _clubDataAccess.getClubId(club_label);
            return await _clubDataAccess.getClubMember(club_id);

        }


        
        public Task<string> ClubInvitation(string url, string email)
        {
            return _emailSender.ClubInvitation(email, url);

        }
    }
}
