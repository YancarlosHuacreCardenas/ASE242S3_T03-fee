import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiencias = [
    {
      titulo: 'Atardecer + Cócteles',
      descripcion: 'Disfruta de la vista panorámica con nuestros cócteles de autor al atardecer.',
      imagen: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/515157469_122140995986749469_1949246412874931737_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFLUNjU9CQlEj73vkdf5Aw4d4jnXf2VjgR3iOdd_ZWOBMo83P4uYIUwh-YX0aj98u07q6UBU4duY0wpRN6vZf8n&_nc_ohc=V_3ltZAv7cQQ7kNvwG03L7b&_nc_oc=Admt8hCcuKF-32Ccao8GD_IGH_VNuuDRr-eLZ2lhGkLGZ8xgiXpPHBe3bu1_5C0vmkw&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=EkZ8-jZRFnvpIE38My1K2g&oh=00_Afen2gSoxiTNU8QgHK0kmNk2nC0drYjUmOlooSJ-4AuzTQ&oe=69057875'
    },
    {
      titulo: 'Cena Gourmet en Terraza VIP',
      descripcion: 'Menú degustación con ingredientes premium en la zona VIP.',
      imagen: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/557588563_122156372540749469_3629245490814096277_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGL6pl4fKwt-otQycTNUscq3tgNMOHMgM3e2A0w4cyAzYqsa9fTWeCncIbRlGeLHn3EQMrNhAPckd37fAoKeLWu&_nc_ohc=JxhCpaFjR1YQ7kNvwGhkvNv&_nc_oc=AdkzG3SOkUv_2aLpAknii5YvigCXn34oF8i0kLXa5LHoW6Daso_X815XJ9p0WSydV24&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=OhfPyF0IzElvgG6XWlzzvg&oh=00_AfemrF49LNt-yZ6aHy9WYPKROFK0wRAjzorfTE3QYWRC1A&oe=690575DE'
    },
    {
      titulo: 'Evento Privado Corporativo',
      descripcion: 'Espacio exclusivo para tu evento con servicio personalizado.',
      imagen: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/545558104_122153419364749469_2798970294043081763_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH0LHbVeZfBI5jLH6kgXnTaeFVMVfwqir54VUxV_CqKvtBJLPYQn2uM_E0H5cy9iDF64cfRVc6y56MMvleJlJbt&_nc_ohc=groZiQ8aIdcQ7kNvwFyPMd7&_nc_oc=AdnqX9UCyS1B0sWa766nxh0_NLgNR-B23yqj6RHPpoLXbioSRJmARYUCzXIQjv7Ipfc&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=HZXsA9ILekQ0FM-NOBIysA&oh=00_Affj6s7MWR3LAb46ohsjQ9cCe50d2haFd5-SnwKqq2nijw&oe=69055FD7'
    }
  ];
}
