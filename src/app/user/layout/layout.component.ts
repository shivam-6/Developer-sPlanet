import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  title = app_config.title;
  url = app_config.api_url + '/';
  sidebarItems = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: 'profile',
    },
    {
      title: 'Add Video',
      icon: 'person-outline',
      link: 'addvideo',
    },
    {
      title: 'Manage Videos',
      icon: 'person-outline',
      link: 'managevideo',
    },
  ];
  constructor(
    private sidebar: NbSidebarService,
    public userService: UserService
  ) {}

  ngOnInit(): void {}
}
