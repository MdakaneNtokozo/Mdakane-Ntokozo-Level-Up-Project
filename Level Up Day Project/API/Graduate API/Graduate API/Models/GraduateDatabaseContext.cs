using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Graduate_API.Models;

public partial class GraduateDatabaseContext : DbContext
{
    public GraduateDatabaseContext()
    {
    }

    public GraduateDatabaseContext(DbContextOptions<GraduateDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Graduate> Graduates { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=graduate_database;uid=root;pwd=juniorDevHere.53", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.43-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Graduate>(entity =>
        {
            entity.HasKey(e => e.Guid).HasName("PRIMARY");

            entity.ToTable("graduate");

            entity.Property(e => e.Guid).ValueGeneratedNever();
            entity.Property(e => e.DateCreated).HasColumnType("datetime");
            entity.Property(e => e.DateEdited).HasColumnType("datetime");
            entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
            entity.Property(e => e.EmailAddress)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.IsDeleted).HasDefaultValueSql("'0'");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("phoneNumber");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
