using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Admin.API.Models
{
    public class Ticket


    {

        public Ticket()
        {
            AdjuntosTicket = new HashSet<AdjuntosTicket>();
            // TicketsAsignados = new HashSet<TicketsAsignados>();
        }
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime FechaAlta { get; set; }
        public string Titulo { get; set; }
        public string Mensaje { get; set; }
        public byte Prioridad { get; set; }
        public byte Estatus { get; set; }


        public User User { get; set; }

        public ICollection<TicketsAsignados> TicketsAsignados { get; set; }

        public ICollection<AdjuntosTicket> AdjuntosTicket { get; set; }

        public ICollection<TicketRespuesta> TicketRespuesta { get; set; }

    }

    public enum Prioridad
    {
        Normal = 1, Alta = 2, Urgente = 3
    }

    public enum Estatus
    {
        Abierto = 1, ReAbrir = 2, EnProceso = 3, Cerrado = 4
    }

    //    bitacoraImportacion.TipoProceso = (int)TipoProceso.Nuevo;

}