package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionCategoryDTO {

	private Long id;

	private String name;

}
