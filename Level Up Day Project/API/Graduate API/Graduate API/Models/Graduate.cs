using System;
using System.Collections.Generic;

namespace Graduate_API.Models;

public partial class Graduate
{
    public int Guid { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailAddress { get; set; }

    public string? PhoneNumber { get; set; }

    public DateTime DateOfBirth { get; set; }

    public DateTime? DateCreated { get; set; }

    public DateTime? DateEdited { get; set; }

    public bool? IsDeleted { get; set; }
}
